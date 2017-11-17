//存取数据到localStorage
export function saveToLocal(id,key,val) {
  let seller = window.localStorage.__seller__;
  if(!seller){
    seller = {};
    //每个商家为一个对象{'123':{'favorite':true},'456':{'favorite':true}}
    //'123':{'favorite':true}
    seller[id] = {};
  }else{
    seller = JSON.parse(seller);
    if(!seller[id]){
      seller[id] = {};
    }
  }
  //favorite:true
  seller[id][key] = val;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

//读取localStorage里面数据
export function localFromLocal(id,key,def) {
  let seller = window.localStorage.__seller__;
  if(!seller){
    return def;
  }
  //把每位商家转为对象
  seller = JSON.parse(seller)[id];
  if(!seller){
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
