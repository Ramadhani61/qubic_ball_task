"use client";
import Widget from "@/components/card/widget";
import PostManagement from "@/components/management/post"
export default function PostPage() {
  return (
    <>
      <div className="px-4">
        <div className="grid grid-cols-12 mt-6">
          <div className="col-span-12">
            <Widget height={"auto"} title={"Data Post"}>
              <div>
              <PostManagement/>
              </div>
            </Widget>
          </div>
        </div>
      </div>
    </>
  );
}
