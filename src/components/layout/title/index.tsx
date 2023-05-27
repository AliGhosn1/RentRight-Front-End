import { TitleProps, useRouterContext } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";
import React from "react";

import { logo, yariga } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="RentRight" width="28px" />
        ) : (
          <img src={yariga} alt="RentRight" width="140px" />
        )}
      </Link>
    </Button>
  );
};
