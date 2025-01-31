import { Component } from '@angular/core';
import { BreakerGridComponent } from '../../../@breaker/components/breaker-grid/breaker-grid.component';
import { BreakerColumnDirective } from '../../../@breaker/components/breaker-column.directive';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
interface Design {
  id: string;
  name: string;
}

interface Impact {
  ait: string;
  appShortName: string;
  appName: string;
  appURL: string;
  sizing: string;
  description: string;
  solutionApproach: string;
  designList: Design[];
}

const appImpactList: Impact[] = [
  {
    ait: "AIT123",
    appShortName: "CRM",
    appName: "Customer Relationship Manager",
    appURL: "/apps/crm",
    sizing: "Large - 120 Story Points",
    description: "Integration of new customer data pipeline with existing CRM system",
    solutionApproach: "Implement REST API endpoints and create new data transformation layer",
    designList: [
      { id: "d1", name: "Data Flow Diagram" },
      { id: "d2", name: "API Specification" }
    ]
  },
  {
    ait: "AIT456",
    appShortName: "INV",
    appName: "Inventory Management",
    appURL: "/apps/inventory",
    sizing: "Medium - 80 Story Points",
    description: "Real-time inventory tracking system enhancement",
    solutionApproach: "Implement WebSocket connections for live updates",
    designList: [
      { id: "d3", name: "System Architecture" },
      { id: "d4", name: "Database Schema" }
    ]
  }
];
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [BreakerGridComponent, BreakerColumnDirective, MatCardModule, CommonModule, RouterModule, MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
    { id: 6, name: 'Diana Evans', email: 'diana.evans@example.com' },
    { id: 7, name: 'Ethan Harris', email: 'ethan.harris@example.com' },
    { id: 8, name: 'Fiona Green', email: 'fiona.green@example.com' },
    { id: 9, name: 'George Hill', email: 'george.hill@example.com' },
    { id: 10, name: 'Hannah King', email: 'hannah.king@example.com' },
    { id: 11, name: 'Ian Lewis', email: 'ian.lewis@example.com' },
    { id: 12, name: 'Jack Martin', email: 'jack.martin@example.com' },
    { id: 13, name: 'Karen Nelson', email: 'karen.nelson@example.com' },
    { id: 14, name: 'Laura O Brien', email: 'laura.obrien@example.com' },
    { id: 15, name: 'Michael Perez', email: 'michael.perez@example.com' },
    { id: 16, name: 'Nina Quinn', email: 'nina.quinn@example.com' },
    { id: 17, name: 'Oscar Roberts', email: 'oscar.roberts@example.com' },
    { id: 18, name: 'Paula Scott', email: 'paula.scott@example.com' },
    { id: 19, name: 'Quincy Taylor', email: 'quincy.taylor@example.com' },
    { id: 20, name: 'Rachel Underwood', email: 'rachel.underwood@example.com' },
    { id: 21, name: 'Sam Vance', email: 'sam.vance@example.com' },
    { id: 22, name: 'Tina White', email: 'tina.white@example.com' },
    { id: 23, name: 'Uma Xavier', email: 'uma.xavier@example.com' },
    { id: 24, name: 'Victor Young', email: 'victor.young@example.com' },
    { id: 25, name: 'Wendy Zane', email: 'wendy.zane@example.com' },
    { id: 26, name: 'Xander Adams', email: 'xander.adams@example.com' },
    { id: 27, name: 'Yara Baker', email: 'yara.baker@example.com' },
    { id: 28, name: 'Zach Carter', email: 'zach.carter@example.com' },
    { id: 29, name: 'Amy Davis', email: 'amy.davis@example.com' },
    { id: 30, name: 'Brian Edwards', email: 'brian.edwards@example.com' }
  ];


  users2 = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
    { id: 6, name: 'Diana Evans', email: 'diana.evans@example.com' },
    { id: 7, name: 'Ethan Harris', email: 'ethan.harris@example.com' },
    { id: 8, name: 'Fiona Green', email: 'fiona.green@example.com' },
    { id: 9, name: 'George Hill', email: 'george.hill@example.com' },
    { id: 10, name: 'Hannah King', email: 'hannah.king@example.com' },
    { id: 11, name: 'Ian Lewis', email: 'ian.lewis@example.com' },
    { id: 12, name: 'Jack Martin', email: 'jack.martin@example.com' },
    { id: 13, name: 'Karen Nelson', email: 'karen.nelson@example.com' },
    { id: 14, name: 'Laura O Brien', email: 'laura.obrien@example.com' },
    { id: 15, name: 'Michael Perez', email: 'michael.perez@example.com' },
    { id: 16, name: 'Nina Quinn', email: 'nina.quinn@example.com' },
    { id: 17, name: 'Oscar Roberts', email: 'oscar.roberts@example.com' },
    { id: 18, name: 'Paula Scott', email: 'paula.scott@example.com' },
    { id: 19, name: 'Quincy Taylor', email: 'quincy.taylor@example.com' },
    { id: 20, name: 'Rachel Underwood', email: 'rachel.underwood@example.com' },
    { id: 21, name: 'Sam Vance', email: 'sam.vance@example.com' },
    { id: 22, name: 'Tina White', email: 'tina.white@example.com' },
    { id: 23, name: 'Uma Xavier', email: 'uma.xavier@example.com' },
    { id: 24, name: 'Victor Young', email: 'victor.young@example.com' },
    { id: 25, name: 'Wendy Zane', email: 'wendy.zane@example.com' },
    { id: 26, name: 'Xander Adams', email: 'xander.adams@example.com' },
    { id: 27, name: 'Yara Baker', email: 'yara.baker@example.com' },
    { id: 28, name: 'Zach Carter', email: 'zach.carter@example.com' },
    { id: 29, name: 'Amy Davis', email: 'amy.davis@example.com' },
    { id: 30, name: 'Brian Edwards', email: 'brian.edwards@example.com' }
  ];
  appImpactList = [
    {
      ait: "AIT123",
      appShortName: "CRM",
      appName: "Customer Relationship Manager",
      appURL: "/apps/crm",
      sizing: "Large - 120 Story Points",
      description: "Integration of new customer data pipeline with existing CRM system",
      solutionApproach: "Implement REST API endpoints and create new data transformation layer",
      designList: [
        { id: "d1", name: "Data Flow Diagram" },
        { id: "d2", name: "API Specification" }
      ]
    },
    {
      ait: "AIT456",
      appShortName: "INV",
      appName: "Inventory Management",
      appURL: "/apps/inventory",
      sizing: "Medium - 80 Story Points",
      description: "Real-time inventory tracking system enhancement",
      solutionApproach: "Implement WebSocket connections for live updates",
      designList: [
        { id: "d3", name: "System Architecture" },
        { id: "d4", name: "Database Schema" }
      ]
    },
    {
      ait: "AIT789",
      appShortName: "HR",
      appName: "Human Resources Portal",
      appURL: "/apps/hr",
      sizing: "Large - 150 Story Points",
      description: "Employee onboarding workflow automation and integration with existing HR systems",
      solutionApproach: "Build microservices architecture with event-driven communication",
      designList: [
        { id: "d5", name: "Workflow Diagram" },
        { id: "d6", name: "Service Architecture" },
        { id: "d7", name: "Database Models" }
      ]
    },
    {
      ait: "AIT101",
      appShortName: "FIN",
      appName: "Financial Analytics Dashboard",
      appURL: "/apps/finance",
      sizing: "XLarge - 200 Story Points",
      description: "Real-time financial data visualization and reporting system with predictive analytics",
      solutionApproach: "Implement data warehouse with real-time ETL pipelines and machine learning models",
      designList: [
        { id: "d8", name: "Data Pipeline Architecture" },
        { id: "d9", name: "ML Model Design" },
        { id: "d10", name: "Dashboard Wireframes" }
      ]
    },
    {
      ait: "AIT202",
      appShortName: "LOG",
      appName: "Logistics Tracking System",
      appURL: "/apps/logistics",
      sizing: "Medium - 90 Story Points",
      description: "GPS-enabled real-time shipment tracking and route optimization",
      solutionApproach: "Implement mobile-first architecture with offline capabilities",
      designList: [
        { id: "d11", name: "Mobile App Design" },
        { id: "d12", name: "Backend Architecture" }
      ]
    },
    {
      ait: "AIT303",
      appShortName: "SEC",
      appName: "Security Compliance Platform",
      appURL: "/apps/security",
      sizing: "Large - 160 Story Points",
      description: "Automated security compliance checking and reporting system",
      solutionApproach: "Build scalable security scanning engine with compliance rule engine",
      designList: [
        { id: "d13", name: "Security Architecture" },
        { id: "d14", name: "Rule Engine Design" },
        { id: "d15", name: "Report Templates" }
      ]
    },
    {
      ait: "AIT404",
      appShortName: "MKT",
      appName: "Marketing Campaign Manager",
      appURL: "/apps/marketing",
      sizing: "Medium - 100 Story Points",
      description: "Multi-channel marketing campaign management and analytics platform",
      solutionApproach: "Implement event-sourcing architecture for campaign tracking",
      designList: [
        { id: "d16", name: "Campaign Flow Diagram" },
        { id: "d17", name: "Analytics Dashboard" }
      ]
    },
    {
      ait: "AIT505",
      appShortName: "SUP",
      appName: "Support Ticket System",
      appURL: "/apps/support",
      sizing: "Large - 140 Story Points",
      description: "AI-powered support ticket routing and resolution system",
      solutionApproach: "Implement NLP-based ticket classification and routing engine",
      designList: [
        { id: "d18", name: "ML Pipeline Design" },
        { id: "d19", name: "Ticket Workflow" },
        { id: "d20", name: "Integration Architecture" }
      ]
    }
  ];
}


