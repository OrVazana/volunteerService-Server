import { Schema } from 'mongoose';

const AddressSchema = Schema({
    city: String,
    street: String,
    houseNumber: String,
});