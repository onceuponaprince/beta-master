import { Contract } from "web3-eth-contract"

export interface Farm {
  contract: Contract,
  stakingTokenContract: Contract,
  name: string,
  depositToken: string,
  depositTokenAddress: string,
  earnToken: string,
  earnTokenAddress: string,
  icon: string,
  id: string,
  sort: number,
  category: string,
}

export interface FarmsContext {
  farms: Farm[],
  unharvested: number
}

export interface PoolProperties {
  id : string,
  index: number,
  pool_address: string,
  stake_token_name: string,
  stake_token_address: string,
  farm_icon_path: string,
  category: string,
}
