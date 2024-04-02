import mongoose from "mongoose";


const FightSchema = new mongoose.Schema({
    challenger: { type: String, required: true },
    challenged: { type: String, required: true },
    winner: { type: String, required: false },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    bids: {
        challenger: { type: Number, default: 0 },
        challenged: { type: Number, default: 0 }
    }
});


const FightRequestSchema = new mongoose.Schema({
    challenger: { type: String, required: true },
    challenged: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
});

const BidSchema = new mongoose.Schema({
    fighter: { type: String, required: true }, // Participant who receives the bid
    amount: { type: Number, required: true }, // Bid amount
    bidder: { type: String, required: true }, // User who placed the bid
    timestamp: { type: Date, default: Date.now } // Timestamp of the bid
});

export const BidModal = mongoose.model("Bid", BidSchema);


export const FightModal = mongoose.model("Fight", FightSchema);
export const createFight = (values: Record<string, any>) => new FightModal(values).save().then((fight) => fight.toObject());


export const FightRequestModal = mongoose.model("FightRequest", FightRequestSchema);
export const createFightRequest = (values: Record<string, any>) =>
    new FightRequestModal(values).save().then((fight) => fight.toObject());