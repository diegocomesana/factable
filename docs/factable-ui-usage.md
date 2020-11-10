# **Factable UI** Usage

<p align="center"><img src="../misc/ui/01.png" alt="Step 1"/></p>
<p align="center"><img src="../misc/ui/02.png" alt="Step 2"/></p>
<p align="center"><img src="../misc/ui/03.png" alt="Step 3"/></p>
<p align="center"><img src="../misc/ui/04.png" alt="Step 4"/></p>
<p align="center"><img src="../misc/ui/05.png" alt="Step 5"/></p>
<p align="center"><img src="../misc/ui/06.png" alt="Step 6"/></p>
<p align="center"><img src="../misc/ui/07.png" alt="Step 7"/></p>
<p align="center"><img src="../misc/ui/08.png" alt="Step 8"/></p>
<p align="center"><img src="../misc/ui/09.png" alt="Step 9"/></p>
<p align="center"><img src="../misc/ui/10.png" alt="Step 10"/></p>

This is should create this test file:

<pre lang="js">
const { someFancyFunc } = require("../../common");

describe("someFancyFunc", () => {
  test("some case description", (done) => {
    const { foo, bar, dontshowthis } = {
      foo: "still",
      bar: "working",
      dontshowthis: false,
    };
    const second = "hello";
    const baz = "fine";
    const expectedOutput = "stillworkinghellofine";
    const output = someFancyFunc({ foo, bar, dontshowthis }, second)(baz);
    expect(output).toEqual(expectedOutput);
    done();
  });
});
</pre>
