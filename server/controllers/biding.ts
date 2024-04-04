import express from 'express';
import { BidModal, createBid } from '../db/biding';
import { FightModal } from '../db/fight';

export const registerBid = async (req: express.Request, res: express.Response) => {
    const { username } = req.query;
    const { fighter, amount } = req.body;
    if (!fighter || !amount || !username) {
        return res.status(400).send({ message: 'Missing required fields' });
    }
    if (amount < 0) {
        return res.status(400).send({ message: 'Amount must be positive' });
    }

    await createBid({
        fighter,
        amount,
        bidder:username,
    });
    res.status(200).send({ message: 'Bid registered' }).end();
};

export const getBids = async (req: express.Request, res: express.Response) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).send({ message: 'Username is required' });
    }
    const bids = await BidModal.find({ bidder: username.toString() });
    res.status(200).send({ bids }).end();
}

export const getFightBiddingOdds = async (req: express.Request, res: express.Response) => {
    const fightingId = req.params.id;
    if (!fightingId) {
        return res.status(400).send({ message: 'Fight ID is required' });
    }
    const bookmakerEdge = 0.1;
    const fightDetails = await FightModal.findById(fightingId);
    const totalChallengerBids = fightDetails?.bids.challenger;
    const totalChallengedBids = fightDetails?.bids.challenged;
    if (!totalChallengerBids || !totalChallengedBids) {
        return res.status(400).send({ message: 'Bids not found not found' });
    }
    const totalBids = totalChallengerBids + totalChallengedBids;
    const impliedProbabilityTeam1 = totalChallengedBids / totalChallengerBids;
    const impliedProbabilityTeam2 = totalChallengerBids / totalChallengedBids;

    const adjustedImpliedProbabilityTeam1 = impliedProbabilityTeam1 * (1 - bookmakerEdge);
    const adjustedImpliedProbabilityTeam2 = impliedProbabilityTeam2 * (1 - bookmakerEdge);

    const challengerTeamOdds = 1 / adjustedImpliedProbabilityTeam1;
    const challengedTeamOdds = 1 / adjustedImpliedProbabilityTeam2;

    // const stake = 1;

    // const payoutTeam1 = challengerTeamOdds * stake;
    // const payoutTeam2 = challengedTeamOdds * stake;
    res.status(200).send({ challengedTeamOdds, challengerTeamOdds }).end();
}

