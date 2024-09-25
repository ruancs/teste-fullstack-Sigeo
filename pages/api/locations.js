// capturar dados vindo do Banco de dados criado

import mongoose from 'mongoose';
import "dotenv/config";

const uri = process.env.DATABASE_URI;

const locationSchema = new mongoose.Schema({
  OBJECTID_1: Number,
  OBJECTID: Number,
  tx_nome: String,
  tx_bairro: String,
  geometry: {
    x: Number,
    y: Number
  }
});

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const locations = await Location.find({});
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao ler dados: ' + error.message });
    } finally {
      await mongoose.connection.close();
    }
  } else {

    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
