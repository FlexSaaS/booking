import type { ClientConfig } from "../configs/ConfigType";
import { luxeSalonConfig } from "../configs/luxeSalonConfig";
import { trimTidyConfig } from "../configs/trimTidyConfig";
import { defaultClientConfig } from "../configs/defaultClient";

const configMap: Record<string, ClientConfig> = {
  luxeSalon: luxeSalonConfig,
  trimTidy: trimTidyConfig,
  default: defaultClientConfig,
};

export function getClientConfig(): ClientConfig {
  const key = import.meta.env.VITE_CLIENT || "default";
  return configMap[key] || defaultClientConfig;
}
