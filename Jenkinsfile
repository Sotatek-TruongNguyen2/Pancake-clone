# Redli - a humane alternative to redis-cli

## About

Redli is a Go-based alternative to the official Redis-cli application. It's major feature is that it mimics the redis-cli command line argurments while also understanding rediss: protocols and supporting a `--tls` flag allowing it to connect to TLS/SSL secured Redis without the need for tunnels. It also has a number of flags and environment variables for passing server certificates over as files or base64 strings. Note, passing a certificate turns TLS on by default.

## Usage

```text
 redli [<flags>] [<commands>...]

      --help               Show context-sensitive help (also try --help-long and --help-man).
      --debug              Enable debug mode.
      --long               Enable long prompt with host/port
  -u, --uri=URI            URI to connect to
  -h, --host="127.0.0.1"   Host to connect to
  -p, --port=6379          Port to connect to
  -a, --auth=AUTH          Password to use when connecting
  -n, --ndb=0              Redis database to access
      --tls                Enable TLS/SSL
      --skipverify         Insecure option to skip server certificate validation
      --certfile=CERTFILE  Self-signed certificate file for validation
      --certb64=CERTB64    Self-signed certificate string as base64 for validation
      --raw                Produce raw output
      --eval=EVAL          Evaluate a Lua script file, follow with keys a , and args
      
Args:
  [<commands>]  Redis commands and values
```

* `URI`  URI to connect To. It follow the format of [the provisional IANA spec for Redis URLs](https://www.iana.org/assignments/uri-schemes/prov/redis), but with the option to denote a TLS secured connection with the protocol rediss:.

e.g. `INFO KEYSPACE`

Be aware of interactions with wild cards and special characters in the shell; quote and escape as appropriate.

## License

Redli is (c) IBM Corporation 2018. All rights reserved.

Redli is released under the Apache 2 License.

Attribution: The `commands.json` file is by Salvatore Sanfillipo.

In the process of building the application, the commands.json file of the Redis-docs repository is retrieved and incorporated into the code. This file is distributed under a CC-BY-SA 4.0 license (see [Copyright](https://github.com/antirez/redis-doc/blob/master/COPYRIGHT)).


def remote = [:]
remote.name = 'nika-fe'
remote.host = '165.22.102.7'
remote.user = 'root'
remote.password = '@Solid0209t'
remote.allowAnyHosts = true

pipeline {
    agent any
    
    stages {

        stage('SSH') {
          steps {
              script {
                echo '==== TRY TO SSH TO NIKA-FE SERVER ===='
                sshCommand remote: remote, command: "ls -lrt"
              }
          }
        }


        stage('BUILD') {
            steps {
              echo '==== PULLING THE LATEST CODE FROM GIHUB ===='
              sshCommand remote: remote, command: "cd ./apps/Pancake-clone && git pull origin -f main && yarn install && yarn build"
              echo 'PREPARE STEP FINISHED !!'
            }
        }

        /* stage('BUILD') { */
        /*     steps { */
        /*       echo '==== INSTALLING THE LATEST CODE DEPENDENCIES ====' */
        /*       sshCommand remote: remote, command: "yarn install" */
        /*       echo 'INSTALL STEP FINISHED !!' */
        /*     } */
        /* } */

        stage('DEPLOY') {
            steps {
              sshCommand remote: remote, command: "pm2 restart 0"
            }
        }
    }
}

