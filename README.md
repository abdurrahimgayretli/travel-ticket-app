### Software prerequisites

Install the below tools/packages

| Serial No   | Software           | Version   | Installation site |
| :---------: | :----------------: | :-------: | :---------------- |
| 1           | Node.js            | >= 18.12.1  | [Install NodeJS](https://nodejs.org/en/download/) |
| 2           | npm                | >= 9.6.4 | [Install NPM](https://www.npmjs.com/get-npm)      |
| 3           | react-native       | >= 0.71.8 | [Install react-native](https://www.npmjs.com/package/react-native) |
| 4           | react-native-cli   | >= 2.0.1  | [Install react-native-cli](https://www.npmjs.com/package/react-native-cli) |
| 5           | exp                | >= 48.0.18 | [Install Expo](https://www.npmjs.com/package/exp) |


### Setup Instructions

#### System setup
1. Clone the repo with `git clone https://github.com/abdurrahimgayretli/travel-ticket-app.git` command
2. Switch to the project's root directory in terminal
3. Install the dependencies by running `npm install`
4. Once, 'npm install' is completed, run `expo start` to start the expo and react-native server
5. If it shows a QR code on the terminal as a result of 'exp start' command, then you are good to go!


Ignore the first step on 'Mobile setup' instructions given below if you already have 'Expo' app installed on your phone.

#### Mobile setup
1. Install 'Expo' application on your android/iOS device. You can find the links to Android and iOS apps [here](https://expo.io/tools#client).
2. Scan the QR code shown on the terminal.
3. Once the QR code is successfully scanned, it will take few seconds to load and render the app.

**Note** This git hook runs everytime you commit. It won't let the developer commit the code if there is any eslint issue on the files changed.

#### Example Data
```yaml
{
  login: 
    e-mail: admin@gmail.com;
    password: admin;
  },
  expeditions: {
    from: Istanbul;
    to: Trabzon;
    date: 21 August 2023 / 25 August 2023;
  }
}
