Step by Step instructions to run Smart-Meal-Planner using Docker
1. cd Smart-Meal-Planner
2. Run " docker build -t my-node-app ." in the container
3. After the image is built run "docker run -p 4000:4000 --name my-node-app-container my-node-app"
4. Access http://localhost:4000 in the browser
5. Hit http://localhost:4000/api/student in the browser to check the student detail.