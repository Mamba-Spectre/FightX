import express from 'express';
import { BidModal, createBid } from '../db/biding';

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


