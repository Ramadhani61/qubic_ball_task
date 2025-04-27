import { useTheme } from "@/context/ThemeContext";
interface propsdata {
  height: any;
  title: String;
  children: React.ReactNode;
}

const Widget = (props: propsdata) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900" : "bg-white"
      }w-full rounded-xl border-left p-5 ${`h-${props?.height}`}`}
    >
      <div className="">
        <div className="flex items-center justify-between gap-1">
          <div
            className={`${
              darkMode ? "text-gray-600" : "text-white"
            }font-medium text-base`}
          >
            {props?.title}
          </div>
        </div>
        <div className={`mt-6`}>{props.children}</div>
      </div>
    </div>
  );
};

export default Widget;
