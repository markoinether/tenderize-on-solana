import React, { useMemo } from "react";
import { Button, Popover } from "antd";
import { useWallet } from "../../contexts/wallet";
import { CurrentUserBadge } from "../CurrentUserBadge";
import { SettingOutlined } from "@ant-design/icons";
import { Settings } from "../Settings";
import { LABELS } from "../../constants";
import { ConnectButton } from "../ConnectButton";
import { useTenderize } from "../../contexts/tenderize";
import { formatNumber } from "../../utils/utils";

export const AppBar = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { connected } = useWallet();

  const tendorize = useTenderize();
  const price = useMemo(() => tendorize ? Number(tendorize.info.stakeTotal) / Number(tendorize.info.poolTotal) : 1.0, [tendorize]);

  const TopBar = (
    <div className="App-Bar-right">
      {connected ? (
        <CurrentUserBadge />
      ) : (
          <ConnectButton
            type="text"
            size="large"
            allowWalletChange={true}
            className="tenderButton"
          />
        )}
      <Popover
        placement="topRight"
        title={LABELS.SETTINGS_TOOLTIP}
        content={<Settings />}
        trigger="click"
      >
        <Button
          shape="circle"
          size="large"
          type="text"
          icon={<SettingOutlined />}
        />
      </Popover>
      {props.right}
      <span>tSOL price: {formatNumber.format(price)}</span>
    </div>
  );

  return TopBar;
};
