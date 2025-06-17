import type { ClientConfig } from "./ConfigType";
import { luxeSalonConfig } from "./clientConfigs.tsx/luxeSalonConfig";
import { trimTidyConfig } from "./clientConfigs.tsx/trimTidyConfig";
import { defaultClientConfig } from "./clientConfigs.tsx/defaultClient";

const configMap: Record<string, ClientConfig> = {
  luxeSalon: luxeSalonConfig,
  trimTidy: trimTidyConfig,
  default: defaultClientConfig,
};

export function getClientConfig(): ClientConfig {
  const key = import.meta.env.VITE_CLIENT || "default";
  return configMap[key] || defaultClientConfig;
}
