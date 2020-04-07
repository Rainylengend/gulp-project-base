class Demo {
  constructor() {
    this.a = 123
  }
  sayA() {
    console.log(this.a + 555);
    return 'result'
  }
}

let d = new Demo()

console.log(d.sayA());
