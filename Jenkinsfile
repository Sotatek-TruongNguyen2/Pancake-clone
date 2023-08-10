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

