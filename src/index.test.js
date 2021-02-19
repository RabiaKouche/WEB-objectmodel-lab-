const fs = require('fs').promises;

import { version, Temperature } from '.';

let data;
beforeAll(async () => {
  data = await fs.readFile('./resources/sensors_data.json', {
    encoding: 'utf8',
  });
  data = JSON.parse(data);
});

describe('Sensor model tests', () => {
  describe('Dummy tests', () => {
    test('data is loaded with 3 elements', () => {
      expect(data.length).toBe(3);
    });
    test('version number from the model', () => {
      expect(version()).toBe('1.0.0');
    });
  });
  /* TODO: Écrire ici la suite de tests pour le modèle objet.*/
  //

  describe('type temperature test', ()=> {
    let temperatureCapteur = new Temperature(1234, 'Température Bureau','TEMPERATURE', {
      values : [23, 23, 22, 21, 23, 23, 23, 25, 25], labels : [
      "2021-01-19T08:00:00.000Z",
      "2021-01-19T09:00:00.000Z",
      "2021-01-19T10:00:00.000Z",
      "2021-01-19T11:00:00.000Z",
      "2021-01-19T12:00:00.000Z",
      "2021-01-19T13:00:00.000Z",
      "2021-01-19T14:00:00.000Z",
      "2021-01-19T15:00:00.000Z",
      "2021-01-19T16:00:00.000Z"
    ]});
  
  
    test('the type is temperature', ()=>{
    
      expect(temperatureCapteur.getType()).toBe("TEMPERATURE");
    });
  
    test('données TEMPERATURE du fichier json',() => {
      let capteur = new Temperature(data[0].id,data[0].name,data[0].type,data[0].data);
      
      expect(capteur.toString()).toEqual(temperatureCapteur.toString());
    });
  
    test('Nombre de valeurs', ()=>{
      
      expect(temperatureCapteur.getData().values.length).toBe(9);
    });
  
    test('Moyenne des valeurs du capteur', ()=>{
      expect(temperatureCapteur.ValeursMoyenne(temperatureCapteur)).toBe(23.11111111111111);
    });
  
    test('Modifier le nom du capteur', ()=> {
      temperatureCapteur.setName("blabla");
      expect(temperatureCapteur.getName()).toBe("blabla");
    });
  
    test("Retourner l'identifiant du capteur", ()=>{
       let id_Attendu = temperatureCapteur.getId();
       expect(1234).toBe(id_Attendu);
    });
  
    test('Modifier les données de capteur', ()=> {
      temperatureCapteur.setData({
        values : [23, 23, 20, 23, 23, 20, 25], labels : [
          "2021-01-19T08:00:00.000Z",
          "2021-01-19T09:00:00.000Z",
          "2021-01-19T10:00:00.000Z",
          "2021-01-19T15:00:00.000Z",
          "2021-01-19T16:00:00.000Z"
        ]
      });
      expect(temperatureCapteur.getData()).toBe(temperatureCapteur.data);
  
    });
  });
  
});
