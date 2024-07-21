import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import ModalAddKitSecurity from "./ModalAddKitSecurity";
import trafficLogo from "../../assets/trafficlly.png";

function NavbarSecurity() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Kits",

  ];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <img src={trafficLogo} alt='trafficlly' width="60px" />
          <p className="font-bold text-inherit">Security</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link isActive aria-current="page" href="/Security" size="lg">
            KITS
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <div className="flex justify-center items-center">
           
            <ModalAddKitSecurity />
          </div>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/home" variant="flat">
            Trafficlly
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color='primary'
              className="w-full"
              href="/Security"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarSecurity;
