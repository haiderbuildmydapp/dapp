import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
// import { MainModel } from "components/common";
import { mainModel } from "store/redux/slices/helperSlices/modelSlice";
import { switchNetwork } from "store/redux/slices/wallet3Connect/web3ConnectSlice";
import { PriceConvertorHook } from "hooks/priceHooks";
import { networkObj } from "../data";
import { ContractUtility } from "utility/contract-utility";
import { MainModel } from "../common";

const HomeCom = () => {
  const dispatch = useAppDispatch();

  const [connectModel, setConnectModel] = useState(false);

  const { web3, account, chainId } = useAppSelector(
    (state) => state.web3Connect
  );

  // const {convertedPrice} = PriceConvertorHook({ amount: 1, id: "2" })

  const handleModelOpen = () => {
    setConnectModel(true);
    dispatch(mainModel(true));
  };

  return (
    <div>
      <MainModel connectModel={connectModel} />
      <button onClick={handleModelOpen}>Connect</button>

      {web3 ? (
        <select
          value={ContractUtility.getProtocol(chainId)}
          onChange={(e) => switchNetwork(web3, e.target.value)}
        >
          {networkObj.map((network, i) => {
            return (
              <option key={i} value={network.value}>
                {network.name}
              </option>
            );
          })}
        </select>
      ) : (
        ""
      )}
      <p>account: {account}</p>
    </div>
  );
};

export default HomeCom;
