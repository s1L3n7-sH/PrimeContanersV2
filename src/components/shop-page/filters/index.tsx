import React from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ContainerTypeSection from "@/components/shop-page/filters/ContainerTypeSection";
import ConditionSection from "@/components/shop-page/filters/ConditionSection";
import HeightSection from "@/components/shop-page/filters/HeightSection";
import AttributesSection from "@/components/shop-page/filters/AttributesSection";
import RollUpDoorWidthSection from "@/components/shop-page/filters/RollUpDoorWidthSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
import DressStyleSection from "@/components/shop-page/filters/DressStyleSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import { Button } from "@/components/ui/button";

const Filters = () => {
  return (
    <>
      <hr className="border-t-black/10" />
      <CategoriesSection />
      <hr className="border-t-black/10" />
      <ContainerTypeSection />
      <hr className="border-t-black/10" />
      <ConditionSection />
      <hr className="border-t-black/10" />
      <HeightSection />
      <hr className="border-t-black/10" />
      <AttributesSection />
      <hr className="border-t-black/10" />
      <RollUpDoorWidthSection />
      <hr className="border-t-black/10" />
      <Button
        type="button"
        className="bg-[#2c2c9c] w-full rounded-full text-sm font-medium py-4 h-12"
      >
        Apply Filter
      </Button>
    </>
  );
};

export default Filters;
