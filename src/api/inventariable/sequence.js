import mongoose, { Schema } from 'mongoose'



export const getValueForNextSequence = (seq) => {
    const db = mongoose.connections[0].db
    return db.collection('sequences').findOneAndUpdate(
        { _id: seq },
        { $inc: { sequence_value: 1 } },
        { 
            projection: {_id: 0, sequence_value: 1}, 
            returnNewDocument: true },
        // fields: { sequence_value: 1 }
        )  
}

export const getCompleteCode = (seq) => {
    return getValueForNextSequence(seq)
        .then((result) => result.value.sequence_value)
        .then((value) => seq + pad(value, TAMCODIGO))
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

const TAMCODIGO = 6



