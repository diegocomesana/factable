# Factable

A test case generation and managment tool for nodejs babel transpiled projects.

# What is Factable?

Factable intercepts your runtime function calls, lets you visualize and define your relevant test cases and then writes tests for them.

Even if you dont't care about test generation, Factable is a great tool to be aware of what's really happening with your functions.

# Why?

Have you ever found yourself running your app and logging your function call inputs and outputs just to use then for your test mocks and assertions?

Have you ever wanted a way to register your runtime function calls to help you build your tests?

# How does it work?

First, your function body is wrapped through a babel plugin that registers all relevant runtime information.

That information is sent to a local server which serves it to a browser client UI resides.

# Facts about Factable

- Factable helps you understand better your functions.
- Factable pretends to help you build tests as soo as possible.
- Factable likes and promotes TDD and BDD.
- Factable loves Funcional Programming (pure functions, inmutability) and pretends to be a tool that promotes its best practices and help be aware of its benefits.
