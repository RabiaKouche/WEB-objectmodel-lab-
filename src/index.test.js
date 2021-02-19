const fs = require('fs').promises;

import { version, Temperature, Door, FAN_SPEED, Light, Humidity, Switch } from '.';

let data;
beforeAll(async () => {
  data = await fs.readFile('./resources/sensors_data.json', {
    encoding: 'utf8',
  });
  data = JSON.parse(data);
});

describe('Sensor model tests', () => {
  describe('Dummy tests', () => {
    test('data is loaded with 6 elements', () => {
      expect(data.length).toBe(6);
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


  describe('type Door test', ()=> {
  
    test('the type is Door', ()=>{
      let capteur = new Door(data[1].id,data[1].name,data[1].type,data[1].data);
      capteur.setType(1);
      expect(capteur.type).toEqual("DOOR");
    });
  
  
    test('données DOOR du fichier json',() => {
      let capteur = new Door(data[1].id,data[1].name,data[1].type,data[1].data);
      let capteurAttendu = new Door(10245,"Porte du Garage","DOOR",  {
        value: 0
      });
      expect(capteur.toString()).toEqual(capteurAttendu.toString());
    });
  
    test('Nombre de valeurs est nul', ()=>{
      let capteurAttendu = new Door(10245,"Porte du Garage","DOOR",  {
        value: 0
      });
      expect(capteurAttendu.data.value).toBe(0);
    });
  
  });


  describe('type FAN_SPEED test', ()=> {
    let tmp = new FAN_SPEED(2222, 'Ventilateur Ordinateur Bureau','FAN_SPEED', {
      "values": [1073, 1800, 2299, 2176, 1899, 1400],
      "labels": [
        "2021-01-19T10:00:00.000Z",
        "2021-01-19T10:05:00.000Z",
        "2021-01-19T10:10:00.000Z",
        "2021-01-19T10:15:00.000Z",
        "2021-01-19T10:20:00.000Z",
        "2021-01-19T10:25:00.000Z"
      ]
    });

    test('the type is fan speed', ()=>{
      expect(tmp.type).toBe("FAN_SPEED");
    });
  
    test('données FAN_SPEED du fichier json',() => {
      let capteur = new FAN_SPEED(data[2].id,data[2].name,data[2].type,data[2].data); 
      expect(capteur.toString()).toEqual(tmp.toString());
    });
  
    test('Nombre de valeurs', ()=>{
      expect(tmp.data.values.length).toBe(6);
    });

    test('Moyenne des valeurs de capteur', ()=>{
      expect(tmp.ValeursMoyenne(tmp)).toBe(1774.5);
    });

    test('Modifier le type de FanSpeed',() => {
      let capteur = new FAN_SPEED(data[2].id,data[2].name,data[2].type,data[2].data);
      capteur.setType(1);
      expect(capteur.type).toEqual("FAN_SPEED");
    });
  });
  
  
  describe('type Light test', ()=> {
    let lightCapteur = new Light(1111, 'lumiere dans une chambre','LIGHT', {
      "values": [1173, 2598, 2299, 2215, 1800, 1435],
      "labels": [
        "2021-01-19T10:00:00.000Z",
        "2021-01-19T10:05:00.000Z",
        "2021-01-19T10:10:00.000Z",
        "2021-01-19T10:15:00.000Z",
        "2021-01-19T10:20:00.000Z",
        "2021-01-19T10:25:00.000Z"
      ]
    });
    test('the type is Light', ()=>{
      expect(lightCapteur.type).toBe("LIGHT");
    });
  
    test('données Light du fichier json',() => {
      let capteur = new Light(data[3].id,data[3].name,data[3].type,data[3].data);
      expect(capteur.toString()).toEqual(lightCapteur.toString());
    });
  
    test('Nombre de valeurs', ()=>{
      expect(lightCapteur.data.values.length).toBe(6);
    });

    test('Moyenne des valeurs de capteur', ()=>{
      expect(lightCapteur.ValeursMoyenne(lightCapteur)).toBe(1920);
    });

    test('Modifier le type du capteur', () => {
        lightCapteur.setName("lumiere");
        expect(lightCapteur.getName()).toBe("lumiere");
      });
    });

    describe('type HUMIDITY test', ()=> {
      let HumidityCapteur = new Humidity(5555, 'chambre humide','HUMIDITY', {
        "values": [1075, 1800, 2297, 2176, 1899],
        "labels": [
          "2021-01-19T10:00:00.000Z",
          "2021-01-19T10:06:00.000Z",
          "2021-01-19T10:10:00.000Z",
          "2021-01-19T10:15:00.000Z",
          "2021-01-19T10:20:00.000Z",
          "2021-01-19T10:25:00.000Z"
        ]
      });
      test('the type is Humidity', ()=>{
      
        expect(HumidityCapteur.type).toBe("HUMIDITY");
      });
    
      test('données humidity du fichier json',() => {
        let capteur = new Humidity(data[4].id,data[4].name,data[4].type,data[4].data);
        
        expect(capteur.toString()).toEqual(HumidityCapteur.toString());
      });
    
      test('Nombre de valeurs', ()=>{
        expect(HumidityCapteur.data.values.length).toBe(5);
      });
    });

    describe("type Switch test", ()=> {
      let SwitchCapteur = new Switch(2035, 'Interrupteur de la salle de cours','SWITCH', {
        "values": 0,
      });
  
      test('the type is Switch', ()=>{
      
        expect(SwitchCapteur.type).toBe("SWITCH");
      });
    
      test('données SWITCH du fichier json',() => {
        let capteur = new Switch(data[5].id,data[5].name,data[5].type,data[5].data);
        
        expect(capteur.toString()).toEqual(SwitchCapteur.toString());
      });
    
      test('Nombre de valeurs', ()=>{
        expect(SwitchCapteur.data.values).toBe(0);
      });
  
  
  });

});
