//codigo para inserir dados no MongoDB

import mongoose from 'mongoose';
import "dotenv/config"
import axios from 'axios';

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

const Location = mongoose.model('Location', locationSchema);

const seedData = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado ao MongoDB');

    const response = await axios.get('https://services8.arcgis.com/TpaOLI1HCh5AcRQB/arcgis/rest/services/Grouplayer_SEXEC_GESTLAG_AGOL/FeatureServer/20/query?where=1=1&outFields=*&f=json');
    const locations = response.data.features.map(feature => ({
      OBJECTID_1: feature.attributes.OBJECTID_1,
      OBJECTID: feature.attributes.OBJECTID,
      tx_nome: feature.attributes.tx_nome,
      tx_bairro: feature.attributes.tx_bairro,
      geometry: feature.geometry
    }));

    await Location.insertMany(locations);
    console.log('Dados inseridos com sucesso');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    await mongoose.connection.close();
  }
};

seedData();