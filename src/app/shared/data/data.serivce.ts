import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Server {
  id: number;
  name: string;
  ip: string;
  status: 'online' | 'offline' | 'maintenance';
}

export interface Container {
  id: number;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused';
}

export interface Design {
  id: number;
  name: string;
  version: string;
  description: string;
  servers: Server[];
  containers: Container[];
}

export interface Application {
  id: number;
  name: string;
  description: string;
  designs: Design[];
}

export interface Portfolio {
  id: number;
  name: string;
  owner: string;
  applications: Application[];
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private portfolios: Portfolio[] = [
    {
      id: 1,
      name: "Adam's Portfolio",
      owner: "Adam Smith",
      applications: [
        {
          id: 101,
          name: 'E-Commerce Platform',
          description: 'Online shopping application with user accounts and payment integration',
          designs: [
            {
              id: 1001,
              name: 'Initial MVP',
              version: '1.0.0',
              description: 'Minimum viable product with basic shopping features',
              servers: [
                { id: 10001, name: 'web-server-1', ip: '192.168.1.10', status: 'online' },
                { id: 10002, name: 'db-server-1', ip: '192.168.1.11', status: 'online' }
              ],
              containers: [
                { id: 20001, name: 'nginx-proxy', image: 'nginx:latest', status: 'running' },
                { id: 20002, name: 'app-server', image: 'node:14', status: 'running' },
                { id: 20003, name: 'redis-cache', image: 'redis:6', status: 'running' }
              ]
            },
            {
              id: 1002,
              name: 'Scale-out Architecture',
              version: '2.0.0',
              description: 'Improved architecture for handling higher traffic',
              servers: [
                { id: 10003, name: 'web-server-2', ip: '192.168.1.12', status: 'online' },
                { id: 10004, name: 'web-server-3', ip: '192.168.1.13', status: 'online' },
                { id: 10005, name: 'db-server-2', ip: '192.168.1.14', status: 'online' }
              ],
              containers: [
                { id: 20004, name: 'load-balancer', image: 'haproxy:2.3', status: 'running' },
                { id: 20005, name: 'app-server-1', image: 'node:16', status: 'running' },
                { id: 20006, name: 'app-server-2', image: 'node:16', status: 'running' }
              ]
            }
          ]
        },
        {
          id: 102,
          name: 'CRM System',
          description: 'Customer Relationship Management system for sales and support teams',
          designs: [
            {
              id: 1003,
              name: 'Monolithic Design',
              version: '1.5.0',
              description: 'Single-server setup with all components',
              servers: [
                { id: 10006, name: 'crm-server', ip: '192.168.2.10', status: 'online' }
              ],
              containers: [
                { id: 20007, name: 'crm-app', image: 'custom-crm:1.5', status: 'running' },
                { id: 20008, name: 'crm-db', image: 'mysql:8', status: 'running' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Sarah's Tech Solutions",
      owner: "Sarah Johnson",
      applications: [
        {
          id: 201,
          name: 'AI-Powered Analytics Dashboard',
          description: 'Real-time analytics with AI-driven insights',
          designs: [
            {
              id: 2001,
              name: 'Cloud-Native Architecture',
              version: '3.2.1',
              description: 'Fully containerized, cloud-native implementation',
              servers: [
                { id: 20001, name: 'k8s-node-1', ip: '10.0.1.10', status: 'online' },
                { id: 20002, name: 'k8s-node-2', ip: '10.0.1.11', status: 'online' },
                { id: 20003, name: 'k8s-node-3', ip: '10.0.1.12', status: 'online' }
              ],
              containers: [
                { id: 30001, name: 'frontend', image: 'analytics-ui:3.2', status: 'running' },
                { id: 30002, name: 'backend', image: 'analytics-api:3.2', status: 'running' },
                { id: 30003, name: 'ml-engine', image: 'ml-processor:2.1', status: 'running' },
                { id: 30004, name: 'timeseries-db', image: 'timescaledb:2.3', status: 'running' }
              ]
            }
          ]
        },
        {
          id: 202,
          name: 'IoT Device Management Platform',
          description: 'Centralized management for IoT devices and data collection',
          designs: [
            {
              id: 2002,
              name: 'Edge Computing Design',
              version: '2.1.0',
              description: 'Distributed architecture with edge computing capabilities',
              servers: [
                { id: 20004, name: 'central-hub', ip: '10.0.2.10', status: 'online' },
                { id: 20005, name: 'edge-node-1', ip: '10.0.3.10', status: 'online' },
                { id: 20006, name: 'edge-node-2', ip: '10.0.3.11', status: 'online' }
              ],
              containers: [
                { id: 30005, name: 'device-registry', image: 'iot-registry:2.1', status: 'running' },
                { id: 30006, name: 'data-collector', image: 'data-collector:1.3', status: 'running' },
                { id: 30007, name: 'edge-processor', image: 'edge-compute:1.1', status: 'running' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Global Finance Solutions",
      owner: "Michael Chang",
      applications: [
        {
          id: 301,
          name: 'Blockchain-based Payment System',
          description: 'Secure and transparent payment processing using blockchain technology',
          designs: [
            {
              id: 3001,
              name: 'Distributed Ledger Architecture',
              version: '1.0.0',
              description: 'Initial implementation of blockchain-based payment processing',
              servers: [
                { id: 30001, name: 'node-1', ip: '172.16.1.10', status: 'online' },
                { id: 30002, name: 'node-2', ip: '172.16.1.11', status: 'online' },
                { id: 30003, name: 'node-3', ip: '172.16.1.12', status: 'online' }
              ],
              containers: [
                { id: 40001, name: 'blockchain-core', image: 'custom-blockchain:1.0', status: 'running' },
                { id: 40002, name: 'payment-api', image: 'payment-gateway:1.0', status: 'running' },
                { id: 40003, name: 'wallet-service', image: 'crypto-wallet:1.2', status: 'running' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Healthcare Innovations",
      owner: "Emily Rodriguez",
      applications: [
        {
          id: 401,
          name: 'Telemedicine Platform',
          description: 'Secure video conferencing and patient management for remote healthcare',
          designs: [
            {
              id: 4001,
              name: 'HIPAA Compliant Cloud Design',
              version: '2.3.0',
              description: 'Cloud-based architecture ensuring HIPAA compliance and data security',
              servers: [
                { id: 40001, name: 'app-server-1', ip: '192.168.5.10', status: 'online' },
                { id: 40002, name: 'app-server-2', ip: '192.168.5.11', status: 'online' },
                { id: 40003, name: 'db-server', ip: '192.168.5.12', status: 'online' }
              ],
              containers: [
                { id: 50001, name: 'video-conferencing', image: 'secure-video:2.3', status: 'running' },
                { id: 50002, name: 'patient-portal', image: 'patient-ui:1.5', status: 'running' },
                { id: 50003, name: 'ehr-integration', image: 'ehr-connect:1.1', status: 'running' }
              ]
            }
          ]
        }
      ]
    }
  ];

  private portfoliosSubject = new BehaviorSubject<Portfolio[]>(this.portfolios);

  getPortfolios(): Observable<Portfolio[]> {
    return this.portfoliosSubject.asObservable();
  }

  getApplications(): Observable<Application[]> {
    return this.getPortfolios().pipe(
      map(portfolios => portfolios.flatMap(portfolio => portfolio.applications))
    );
  }

  getApplication(appId: number): Observable<Application | undefined> {
    return this.getApplications().pipe(
      map(applications => applications.find(app => app.id === appId))
    );
  }

  getDesign(appId: number, designId: number): Observable<Design | undefined> {
    return this.getApplication(appId).pipe(
      map(application => application?.designs.find(design => design.id === designId))
    );
  }

  // Add more methods as needed for specific data operations
}
