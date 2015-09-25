function updateItemID(obj){
  var x = nlapiSearchRecord('item', null, new nlobjSearchFilter('itemid', null, 'is', obj.oldID));
  var y = x[0];
  var r = nlapiLoadRecord('inventoryitem', y.id);
  r.setFieldValue('itemid', obj.newID);
  var id = nlapiSubmitRecord(r, true);
  return id;
}
