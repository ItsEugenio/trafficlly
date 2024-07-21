import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { PiSecurityCameraBold } from "react-icons/pi";

function ButtonSecurityNav() {
  return (
    <div className="fixed bottom-90 right-4">
    <Link href="/Security">
      <Button
        color="primary"
        href="#"
        variant="flat"
        isIconOnly
        size="lg"
      >
        <PiSecurityCameraBold size={35}/>
      </Button>
    </Link>
  </div>
  );
}

export default ButtonSecurityNav;
