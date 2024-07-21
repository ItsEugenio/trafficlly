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
import "../App.css";
import trafficLogo from "../assets/trafficlly.png";

function NavT() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const linksNav = [
    { title: "Ver Kits", link: "/KitsTrafficcly" },
    { title: "Trafficlly", link: "/Home" },
    { title: "Estadísticas", link: "/Estadisticas" },
  ];

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-navbarPrimary">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <a href="/home">
            <div className="flex">
              <img src={trafficLogo} alt="" width="60px" />
              <div className="flex justify-center items-center">
                <h2 className="font-bold text-inherit text-center">Trafficlly</h2>
              </div>
            </div>
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/KitsTrafficcly">
            Ver Kits
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/home" aria-current="page">
            Trafficlly
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Estadisticas">
            Estadísticas
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" variant="flat" onClick={cerrarSesion}>
            Cerrar Sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {linksNav.map((item) => (
          <NavbarMenuItem key={`${item}`}>
            <Link
              color="foreground"
              className="w-full"
              href={item.link}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavT;
