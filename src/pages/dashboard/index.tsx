import type { NextPage } from "next";
import Container from "~/components/Container";
import { useContractReads, useNetwork } from "wagmi";
import { useState } from "react";
import { pulseChain } from "~/lib/pulseChain";
import {
  NumberStatCard,
  ChainStatCard,
  DateStatCard,
} from "~/components/StatCards";
import { xenContract } from "~/lib/xen-contract";

interface DashboardData {
  globalRank: Number;
  activeMinters: Number;
  activeStakes: Number;
  totalXenStaked: Number;
  totalXenLiquid: Number;
  genesisTs: Number;
}

const Home: NextPage = () => {
  const { chain } = useNetwork();
  const [dashboardData, setDashboardData] = useState<DashboardData>();

  const {} = useContractReads({
    contracts: [
      {
        ...xenContract(chain),
        functionName: "globalRank",
      },
      {
        ...xenContract(chain),
        functionName: "activeMinters",
      },
      {
        ...xenContract(chain),
        functionName: "activeStakes",
      },
      {
        ...xenContract(chain),
        functionName: "totalXenStaked",
      },
      {
        ...xenContract(chain),
        functionName: "totalSupply",
      },
      {
        ...xenContract(chain),
        functionName: "genesisTs",
      },
    ],

    onSuccess(data) {
      setDashboardData({
        globalRank: Number(data[0]),
        activeMinters: Number(data[1]),
        activeStakes: Number(data[2]),
        totalXenStaked: Number(data[3]),
        totalXenLiquid: Number(data[4]),
        genesisTs: Number(data[5]),
      });
    },
    cacheOnBlock: true,
    watch: true,
  });

  const generalStats = [
    {
      title: "Global Rank",
      value: Number(dashboardData?.globalRank),
    },
    {
      title: "Active Minters",
      value: Number(dashboardData?.activeMinters),
    },
    {
      title: "Active Stakes",
      value: Number(dashboardData?.activeStakes),
    },
  ];

  const stakeItems = [
    {
      title: "Total",
      value:
        (Number(dashboardData?.totalXenLiquid) +
          Number(dashboardData?.totalXenStaked)) /
        1e18,
    },
    {
      title: "Liquid",
      value: Number(dashboardData?.totalXenLiquid) / 1e18,
    },
    {
      title: "Stake",
      value: Number(dashboardData?.totalXenStaked) / 1e18,
    },
  ];

  return (
    <div>
      <main>
        <Container>
          <div className="flex flex-col space-y-8">
            <div className="card glass text-neutral">
              <div className="card-body text-neutral">
                <h2 className="card-title">General Stats</h2>
                <div className="stats stats-vertical bg-transparent text-neutral">
                  <ChainStatCard
                    value={chain?.name ?? pulseChain.name}
                    id={chain?.id ?? pulseChain.id}
                  />
                  <DateStatCard
                    title="Days Since Launch"
                    dateTs={Number(dashboardData?.genesisTs) * 1000 ?? 0}
                    isPast={true}
                  />
                  {generalStats.map((item, index) => (
                    <NumberStatCard
                      key={index}
                      title={item.title}
                      value={item.value}
                      decimals={0}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="card glass">
              <div className="card-body text-neutral">
                <h2 className="card-title">Supply</h2>
                <div className="stats stats-vertical bg-transparent text-neutral">
                  {stakeItems.map((item, index) => (
                    <NumberStatCard
                      key={index}
                      title={item.title}
                      value={item.value}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Home;