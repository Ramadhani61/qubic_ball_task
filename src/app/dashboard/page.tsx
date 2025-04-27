"use client";
import Widget from "@/components/card/widget";
import UserManagement from "@/components/management/user"
export default function DashboardPage() {
  return (
    <>
      <div className="px-4">
        <div className="grid grid-cols-12 mt-6">
          <div className="col-span-12">
            <Widget height={"auto"} title={"Data User"}>
              <div>
              <UserManagement/>
              </div>
            </Widget>
          </div>
        </div>
      </div>
    </>
  );
}
