function abc() {
  console.time("abc");

  for (var i = 0; i < 100; i++) {
    console.log(i);
  }

  console.timeEnd("abc");
  return 42;
}
