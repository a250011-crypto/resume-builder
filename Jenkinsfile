pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'docker compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Resume Builder deployed successfully!'
        }
        failure {
            echo 'Pipeline execution failed.'
        }
    }
}