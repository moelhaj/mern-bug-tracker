import React, { useEffect, useContext, useRef } from "react";
import { Global } from "../../../Contexts/Global";
import Chart from "chart.js";

function Details() {

    const statusChart = useRef(null);
    const priorityChart = useRef(null);
    const tasksChart = useRef(null);
    const { projects, todos } = useContext(Global);

    useEffect(() => {
        let tasks = [];
        projects.forEach(project => {
            project.tasks.forEach(task => {
                tasks.push(task);
            });
        });

        const statusConfig = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        projects.filter(project => project.status === "Open").length,
                        projects.filter(project => project.status === "Completed").length
                    ],
                    backgroundColor: ['#0a76b6', '#52d138'],
                    label: 'Status'
                }],
                labels: ['Open', 'Completed']
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: "Projects by status"
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };

        const priorityConfig = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        projects.filter(project => project.priority === "High").length,
                        projects.filter(project => project.priority === "Medium").length,
                        projects.filter(project => project.priority === "Low").length
                    ],
                    backgroundColor: ['#ED295B', '#f18034', '#52d138'],
                    label: 'Priorities'
                }],
                labels: ['High', 'Medium', 'Low']
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: "Projects by priorities"
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };

        const tasksConfig = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        tasks.filter(task => task.priority === "Urgent").length,
                        tasks.filter(task => task.priority === "High").length,
                        tasks.filter(task => task.priority === "Medium").length,
                        tasks.filter(task => task.priority === "Low").length
                    ],
                    backgroundColor: ['#ee0a43', '#ED295B', '#f18034', '#52d138'],
                    label: 'Tasks'
                }],
                labels: ['Urgents', 'High', 'Medium', 'Low']
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: "Tasks by priorities"
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
        // Charts
        let statusCTX = statusChart.current.getContext('2d');
        let priorityCTX = priorityChart.current.getContext('2d');
        if (projects.length > 0) {
            window.myDoughnut = new Chart(statusCTX, statusConfig);
            window.myDoughnut = new Chart(priorityCTX, priorityConfig);

        } else {
            statusCTX.font = "30px Poppins";
            statusCTX.fillText("No Projects", 50, 100);
            priorityCTX.font = "30px Poppins";
            priorityCTX.fillText("No Projects", 50, 100);
        }
        let tasksCTX = tasksChart.current.getContext('2d');
        if (tasks.length > 0) {
            window.myDoughnut = new Chart(tasksCTX, tasksConfig);
        } else {
            tasksCTX.font = "30px Poppins";
            tasksCTX.fillText("No Tasks", 50, 100);
        }
    }, [projects, todos]);

    return <>
        <div className="details">
            <div>
                <canvas ref={statusChart}></canvas>
            </div>
            <div>
                <canvas ref={priorityChart}></canvas>
            </div>
            <div>
                <canvas ref={tasksChart}></canvas>
            </div>
        </div>
    </>;
}

export default Details