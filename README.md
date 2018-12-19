<img alt="AIE" src="https://github.com/antoniojuansanchez/aie/raw/master/readme/logo.png" width="200">
Adaptative Interface Ecosystem

An Adaptive Interface Ecosystem (EAI) tries to solve conflicts related to the use of an application in a particular way, that is, when the profile of users of an application is so diverse that the interface can not adapt to the needs of all they. It is generally thought that an application must present a UX that suits most of its users, and this interface usually varies through the versions of the application modified according to the use and needs of users. An EIA is an interface that analyzes user usage patterns and mutates to adapt to them without needing to be modified or updated.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
- Opera 57 or similar
- Chrome 7.0 or similar
- yarn
### Installing
Build the Chrome/Opera extension:
```
cd devtool
yarn build
```
Install de extension in Chrome/Opera
- Go to Chrome menu: ":" > "More Tools" > "Add extensions"
- Add devtool folder to Chrome extension

And when you explore the code you can see the AIE Panel

![Chrome extension](https://github.com/antoniojuansanchez/aie/raw/master/readme/img.png)

### See the example

In the htmlSample you can see a example with a lot of options of AIE library  

```
cd htmlSample
yarn start
```
and access to http://localhost:8080

### Running the tests

```
yarn tests
```

* [yarn](https://yarnpkg.com/lang/en/) - The web framework used

## Authors

* **Antonio Juan Sánchez Martin** - [github.com](https://github.com/antoniojuansanchez)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Sara Rodríguez
