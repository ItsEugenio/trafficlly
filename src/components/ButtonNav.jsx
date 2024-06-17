import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { PiSecurityCameraBold } from "react-icons/pi";

function ButtonNav() {
  const content = (
    <PopoverContent className="w-[240px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <div className="mt-2 flex flex-col gap-2 w-full">
            <a href="/Security">
              <h2 className="text-center ">Ir al Sistema de seguridad</h2>
            </a>
          </div>
        </div>
      )}
    </PopoverContent>
  );
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <div className="fixed top-0 left-38 right-0 mt-20 mr-4">
          <Popover showArrow offset={10} placement="bottom" backdrop="blur">
            <PopoverTrigger>
              {/* <Button isIconOnly  color="primary" variant="shadow" className="w-2">
              <PiSecurityCameraBold size={20}/>
              </Button> */}
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <PiSecurityCameraBold size={25}/>
              </button>
            </PopoverTrigger>
            {content}
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default ButtonNav;
