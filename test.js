

function principal(){
  mostrar(4,5,factorial);
  mostrar(14,5,fibonacci);
}

function mostrar(a ,b, fa){
  console.log(a + b);
  fa(a+b);
}

function factorial(n){
  var i = 100000000;
  while(i>0){
    i--;
  }
  console.log("sacar el factorial de " + n);
}

function fibonacci(n){
  console.log("fibonacci de " + n);
}

principal();
