# Environment configuration library
##Features:
 1. It will set environment variable from .env file which will be at the project root folder 
 2. It will check environment variable  from ".env.tpl" file whether environment variable is declared or not in ".env" file 
 3. It will provide typecasting of environment variables
  
## Getting started
This library provide you facility to easily manage list of  environment variables.
 The typecasting  methods are defined  in [getenv](https://github.com/ctavan/node-getenv) library.
 
```
$ npm install node-env-man
```
### Usage:

Following steps need to follow before using this library:
1. Create ".env" file on project root directory and define your environment variable ex. development,production,test,uat etc.
  
  Contents of ***.env*** file
   ```
     PORT=8080
     NODE_ENV=developemnt
   ```

2. Create ".env.tpl" file on project directory which contains template of all environment variables. 
   This file will be shared among team to check list of environment variables and corresponding sample value.
   

 Contents of ***.env.tpl***  file
 
   ```
     #define your application port number
     PORT=<Port number ex:3002,8080>
     #define your application node environment 
     NODE_ENV=<sample value "developemnt","test","production">
   ```


3. Define your environment variable in both files ".env" and  ".env.tpl". ".env" file will be used for local purpose.
 
 
###Example

Please require this library as early as possible to get list of environment variables from .env file

```
var env = require('node-env-man');
```

***To get list of environment variable***
```
var env = envConf.getEnv();

//To access enviorment variable 
 console.log("Port : ",env.string('PORT'));
 ```
 

***check whether all environment variables are declared  in .env file or using process.env :

 If environment variables are defined in ".env.tpl" but missing in ".env" file  then it will throw error otherwise it will return empty [];
  
   ```
    env.checkEnvironmentVariables();
//sample error:  "Please set environment variable PORT"
```
***Easy to typecast environment variable***
 ```
 var port = env.int('PORT');
```


### Test

```
$ npm test
```