"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Zap, Plus, TrendingUp } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  technologies: string[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
  });
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);


useEffect(() => {
  async function loadDashboard() {
    try {
      setIsLoading(true);

      const response = await fetch("/api/projects");
      const result = await response.json();

      if (response.ok) {
        const projects = result.data || [];

        setStats((prev) => ({
          ...prev,
          projects: projects.length,
        }));

        setRecentProjects(projects.slice(0, 5));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  loadDashboard();
}, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to your admin panel. Manage your portfolio content here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Projects Card */}
        <Card className="p-6 bg-white dark:bg-neutral-900 border dark:border-neutral-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Total Projects
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.projects}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 dark:text-green-400">Active</span>
          </div>
        </Card>

        {/* Blog Card */}
        <Card className="p-6 bg-white dark:bg-neutral-900 border dark:border-neutral-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Total Blog Posts
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.blogs}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 dark:text-green-400">
              Coming Soon
            </span>
          </div>
        </Card>

        {/* Quick Actions Card */}
        <Card className="p-6 bg-white dark:bg-neutral-900 border dark:border-neutral-800">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">
              Quick Actions
            </p>
            <div className="space-y-2">
              <Link href="/admin/projects/add" className="block">
                <Button className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4" />
                  Add Project
                </Button>
              </Link>
              <Link href="/admin/projects" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Manage Projects
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card className="bg-white dark:bg-neutral-900 border dark:border-neutral-800">
        <div className="p-6 border-b dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Projects
          </h2>
        </div>

        {isLoading ? (
          <div className="p-6 text-center text-gray-600 dark:text-gray-400">
            Loading...llllllll
          </div>
        ) : recentProjects.length === 0 ? (
          <div className="p-6 text-center text-gray-600 dark:text-gray-400">
            <p className="mb-4">No projects yet</p>
            <Link href="/admin/projects/add">
              <Button>Create Your First Project</Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y dark:divide-neutral-800">
            {recentProjects.map((project) => (
              <div
                key={project._id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 px-2 py-1">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
