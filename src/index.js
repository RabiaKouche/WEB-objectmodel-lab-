export const version = () => '1.0.0';

/* TODO : Créer le modèle objet ici */

const Enumeration = function (keys) {
  const enumeration = Object.create(null);
  for(const key of keys) {
    enumeration[key] = key;
  }
  enumeration[Symbol.iterator] = function* () {
    for(const key of keys) {
      yield enumeration[key];
    }
  };
  Object.freeze(enumeration);
  return enumeration;
};

const SensorType =  new Enumeration(["TEMPERATURE", 'HUMIDITY', 'LIGHT', 'SWITCH', 'DOOR', 'FAN_SPEED']);

function typeCapteur(id_sensor_type, value) {
  value = [...SensorType][id_sensor_type];
  return value;
}



export class Sensor {


    constructor(id, name, type, data) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.data = data;
    }

    getId() {
      return this.id;
    }

    setName(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }

    setType(type){
      this.type = type;
    }

    getType(){
      return this.type;
    }

    setData(data){
      if (data.labels && data.values){
        this.data = new TimeSeries(data.values,data.labels);
      }
      else if(data.value){
          this.data = new Datum(data.value);
        }else {
        this.data = new Data();
      }

    }
    getData(){
      return this.data;

    }
    
  toString() {
    return (`Capteur : ${this.id}, ${this.name}, ${this.type}, ${this.data}`);
  }
  
ValeursMoyenne(capteur){
 let b = capteur.data.values.length;
 let a = capteur.data.values;
     let c = 0, i;
  for (i = 0; i < b; i++){
    c += Number(a[i]);
  }
  return c/b;
}

  }


export  class Temperature extends Sensor {

      constructor(id, name, type, data) {
        super(id, name, type, data);
      }

      setType(type) {
        this._type= typeCapteur(type);
      }
    
    }

export class Humidity extends Sensor {
  constructor(id, name, type, data) {
    super(id, name, type, data);
    
  }
  setType(value) {
    this._type= typeCapteur(value);
  }

  toString() {
    return (`${super.toString()}`);
  }
}

export class Light extends Sensor {
  constructor(id, name, type, data) {
    super(id, name, type, data);
    
  }

  setType(value) {
    this._type= typeCapteur(value);
  }

  toString() {
    return (`${super.toString()}`);
  }
}

export  class Switch extends Sensor {
  constructor(id, name, type,data) {
    super(id, name, type,data);
  }

  setType(value) {
    this._type= typeCapteur(value);
  }

  toString() {
    return (`${super.toString()}`);
  }
}

export  class Door extends Sensor {
  constructor(id, name, type,data) {
    super(id, name, type,data);
  }

  setType(value) {
    this._type= typeCapteur(value);
  }

  toString() {
    return (`${super.toString()}`);
  }
}


export  class FAN_SPEED extends Sensor {
    constructor(id, name, type,data) {
      super(id, name, type,data);
    }
    setType(value) {
      this._type= typeCapteur(value);
    }

    toString() {
      return (`${super.toString()}`);
    }
  }

  

  

 export class Data {
    
    }
  
 export class TimeSeries extends Data{

    constructor(values, labels){
      super();
      this.values = values;
      this.labels = labels;
    }

    setValues(values){
      this.values = values;
    }

    setLabels(labels){
      this.labels = labels;
    }

    getValues(){
     return this.labels;
    }

    getLabels(){
      return this.labels;
    }

    toString() {
      return (`TimeSeries :  ${this.values},${this.labels} `);
    }

  }


   export class Datum extends Data{
    
  
      constructor(value){
        super();
        this.value = value;
      }
  
      setValue(value){
        this.value = value;
      }
  
  
      getValue(){
       return this.value;
      }

      toString() {
        return (`TimeSeries :  ${this.values}`);
      }
  
    
  }

   

  