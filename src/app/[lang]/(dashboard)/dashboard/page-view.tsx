"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportsSnapshot from "./components/reports-snapshot";
import CountryMap from "./components/country-map";
import UserDeviceReport from "./components/user-device-report";
import UserStats from "./components/user-stats-chart";
import UsersStat from "./components/users-stat";
import ReportsArea from "./components/reports-area";
import DashboardSelect from "@/components/dasboard-select";
import TopTen from "./components/top-ten";
import TopPage from "./components/top-page";
import DatePickerWithRange from "@/components/date-picker-with-range";
import EcommerceStats from "./components/ecommerce-stats";
import RevinueChart from "./components/revinue-chart";
import TopBrowserChart from "./components/top-browser-chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import TopSell from "./components/top-sell";
import TopCustomers from "./components/top-customers";
import VisitorsReportChart from "./components/visitors-chart";
import CustomerStatistics from "./components/customer-statistics";
import DashboardDropdown from "@/components/dashboard-dropdown";
import Transaction from "./components/transaction";
import Orders from "./components/orders";
import TopCountries from "./components/top-countries";
import Products from "./components/products";
import ReportsCard from "./components/reports";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReportChart from "./components/report-chart";
import Workload from "./components/workload";
import ProjectBudget from "./components/project-budget";
import WorksNote from "./components/works-note";
import OverdueTask from "./components/overdue-task";
import ProjectBudgetBar from "./components/project-budget-bar";
import ActiveTask from "./components/active-task";
import UpcomingDeadline from "./components/upcoming-deadlines";
import RecentActivity from "./components/recent-activity";
import TopContributer from "./components/top-contributer";
import { Icon } from "@iconify/react";
import WelcomeBlockProjectDashboard from "./components/welcome-block-project-dashboard";
import { Button } from "@/components/ui/button";
import PromotionalCard from "./components/promotional-card";
import InvoiceStats from "./components/invoice-stats";

interface DashboardPageViewProps {
  trans: {
    [key: string]: string;
  };
}
const DashboardPageView = ({ trans }: DashboardPageViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800 ">
          Analytics {trans?.dashboard}
        </div>
        <DatePickerWithRange />
      </div>
      <Card className="mt-6">
        <CardHeader className="flex-row items-center border-none mb-0">
          <CardTitle className="flex-1 text-xl font-medium text-default-900">
            Invoice Overview
          </CardTitle>
          <Button
            className="flex-none border-default-300 text-default-600 h-9 text-xs font-medium"
            variant="outline"
          >
            <Icon
              icon="heroicons:funnel"
              className="w-3.5 h-3.5 ltr:mr-0.5 rtl:ml-0.5"
            />
            Filter
          </Button>
        </CardHeader>
        <CardContent className="pt-0 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            <PromotionalCard />
            <InvoiceStats />
          </div>
        </CardContent>
      </Card>
      {/* reports area */}
      <div className="grid grid-cols-12  gap-6 ">
        <div className="col-span-12 lg:col-span-8">
          <ReportsSnapshot />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <UsersStat />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReportsArea />
        </div>
        <Card>
          <CardHeader className="border-none p-6 pt-5 mb-0">
            <CardTitle className="text-lg font-semibold text-default-900 p-0">
              New vs Returning Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserStats />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-none p-6 pt-5 mb-0">
            <CardTitle className="text-lg font-semibold text-default-900 p-0">
              Device Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashtail-legend">
              <UserDeviceReport />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader className="border-none pb-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 text-xl font-semibold text-default-900 whitespace-nowrap">
                User By Country
              </div>
              <div className="flex-none">
                <DashboardSelect />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-0">
            <CountryMap />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <TopTen />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader className="border-none pb-0">
              <CardTitle className="pt-2.5">Top Page/Post</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <TopPage />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="text-2xl font-medium text-default-800">
          Ecommerce Dashboard
        </div>
        <DatePickerWithRange />
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <EcommerceStats />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader className="border-none pb-0 mb-0">
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="flex-1 whitespace-nowrap">
                  Average Revenue
                </CardTitle>
                <div className="flex-none">
                  <DashboardSelect />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <RevinueChart />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <Card className="py-2.5">
            <CardHeader className="flex-row items-center justify-between gap-4 border-none">
              <CardTitle>Top Browser</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-8">
              <TopBrowserChart />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12  gap-6">
        <div className="col-span-12 lg:col-span-4 2xl:col-span-5">
          <Card>
            <CardHeader className="mb-0">
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="flex-1 whitespace-nowrap">
                  Top Sell
                </CardTitle>
                <div className="flex-none">
                  <DashboardSelect />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-0 pt-0 h-[520px] pb-2">
              <ScrollArea className="h-full">
                <TopSell />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-8 2xl:col-span-7">
          <TopCustomers />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader className=" gap-4 border-none pb-0 mb-0">
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="flex-1 whitespace-nowrap">
                  Visitors Report
                </CardTitle>
                <div className="flex-none">
                  <DashboardSelect />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-0">
              <VisitorsReportChart />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <CustomerStatistics />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader className="flex-row justify-between items-center gap-4 mb-0 border-none p-6 pb-4">
              <CardTitle className="whitespace-nowrap">
                Transaction History
              </CardTitle>
              <DashboardDropdown />
            </CardHeader>
            <CardContent className="px-0 pt-0 h-[580px] pb-0">
              <ScrollArea className="h-full">
                <Transaction />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Orders />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <TopCountries />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Products />
        </div>
      </div>

      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800">
          Project Dashboard
        </div>
        <DatePickerWithRange />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 mt-10 md:mt-0">
          <WelcomeBlockProjectDashboard />
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
            <ReportsCard />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-8 grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Card>
              <CardHeader className="mb-0 border-none pt-6 pl-7 pb-0 flex-row flex-wrap items-center justify-between gap-4">
                <CardTitle className="whitespace-nowrap">
                  Report Chart
                </CardTitle>
                <div className="w-[170px]">
                  <Select>
                    <SelectTrigger className="text-default-500 bg-transparent dark:bg-transparent">
                      <Icon
                        icon="heroicons:calendar-days"
                        className="w-4 h-4"
                      />
                      <SelectValue placeholder="Select Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Jan 10,2024</SelectItem>
                      <SelectItem value="11">Jan 11,2024</SelectItem>
                      <SelectItem value="12">Jan 12,2024</SelectItem>
                      <SelectItem value="13">Jan 13,2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ReportChart />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-12 xl:col-span-7 ">
            <Workload />
          </div>
          <div className="col-span-12 xl:col-span-5">
            <ProjectBudget />
          </div>
        </div>
        <div className="col-span-12 2xl:col-span-4">
          <WorksNote />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6 xl:col-span-5">
          <OverdueTask />
        </div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-7">
          <ProjectBudgetBar />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6 xl:col-span-7">
          <Card>
            <CardHeader className="border-none pt-6">
              <CardTitle>Active Task</CardTitle>
            </CardHeader>
            <CardContent className="px-3">
              <ActiveTask />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-5">
          <UpcomingDeadline />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6 xl:col-span-5">
          <RecentActivity />
        </div>
        <div className="col-span-12 lg:col-span-6 xl:col-span-7">
          <TopContributer />
        </div>
      </div>
    </div>
  );
};

export default DashboardPageView;
