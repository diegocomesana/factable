# Factable

A test case generation and managment tool for nodejs babel transpiled projects.

## What is Factable?

Factable intercepts your runtime function calls, lets you visualize and define your relevant test cases and then writes tests for them.

Even if you dont't care about test generation, Factable is a great tool to be aware of what's really happening with your functions.

## Why?

Have you ever found yourself running your app and logging your function call inputs and outputs just to use them for your test mocks and assertions?

Have you ever wanted a way to register your runtime function calls to help you build your tests?

We are lazy. Every time we find ourselves doing stuff that could be automated or at least assisted, we go for it. Thats why Factable exists.

## How does it work?

First, your function body is wrapped (at transpiling time) through a babel plugin that registers all relevant runtime information.

Then, that information is sent to a local server which serves it to the browser, where the client UI resides.

Lastly, UI client connects to the server through websockets to manage user interaction.

Factable server can register function calls and write and erase test files.

Factable saves its state in "factable.json" file in the root of your project. Every test written is saved there. You should include it in your git tracked files.

## Facts about Factable

- Factable helps you understand your functions better.
- Factable pretends to help you build tests as soon as possible.
- Factable likes and promotes TDD and BDD.
- Factable loves Funcional Programming (pure functions, inmutability) and aims to be a tool that promotes its best practices and increase awareness about its benefits.
- Factable tests are not perfect and not always pass
