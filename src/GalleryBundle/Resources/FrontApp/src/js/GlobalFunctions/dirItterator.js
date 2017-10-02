function dirItterator(obj, dirArr) {
  var temp;
   for (var i=0;i<obj.length;i++) {
     if (obj[i].length) {
       temp=obj[i].split('&')
         dirArr[dirArr.length] = {
             id: temp[1],
             name: temp[0]
         };
     }

   }
}
