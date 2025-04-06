import { SubmitBtnComponent } from "@/components/form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { tableFilterComponentsMap } from "@/lib/utils/table";
import { TableFilterField } from "@/types";
import { FormProvider, useForm } from "react-hook-form";

type FormType = Record<string, string | string[]>;

interface TableFiltersSheetProps {
  sidebarFilters: TableFilterField[];
  updateMultipleFilters: (filters: {
    [key: string]: string | string[] | null;
  }) => void;
  searchParamsValues: { [key: string]: string | string[] };
  resetFilters: () => void;
}

const TableFiltersSheet: React.FC<TableFiltersSheetProps> = ({
  sidebarFilters,
  updateMultipleFilters,
  searchParamsValues,
  resetFilters,
}) => {
  const initialFiltersValues = sidebarFilters.reduce<Record<string, string>>(
    (acc, filter) => {
      if (filter.id) {
        acc[filter.id] = "";
      }
      return acc;
    },
    {}
  );

  const values = { ...initialFiltersValues, ...searchParamsValues };
  delete values.page;
  delete values.limit;

  const methods = useForm<FormType>({
    mode: "onChange",
    values,
  });
  console.log("filter values ", values, methods.watch());
  //console.log({ defaultFiltersValues, defaultValues, total: methods.watch() });

  const onSubmit = async (body: FormType) => {
    //console.log({ body });
    updateMultipleFilters(body);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          filters
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader className=" mb-5">
          <SheetTitle>
            <SheetDescription>filters</SheetDescription>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-tssah bg -green-300 px-3">
          <FormProvider {...methods}>
            <form
              className="w-full   bg- red-400 min-h-tssah flex flex-col gap"
              method="post"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className="w-full grow bg -blue-400 grid grid-cols-2 gap-x-5 content-start">
                {sidebarFilters.map(({ id, component, props, ...rest }) => {
                  if (!component || !(component in tableFilterComponentsMap))
                    return null; // Type-safe check

                  const Component = tableFilterComponentsMap[component];

                  return (
                    <Component
                      key={id}
                      id={id}
                      name={id}
                      {...props}
                      {...rest}
                    />
                  );
                })}
              </div>

              <div className="flex justify-end py-6 mt-auto gap-5">
                <Button
                  type="button"
                  className="w-full mt-auto"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <SubmitBtnComponent
                  //value={t("form.SubmitBtnComponent.value")}
                  value={"Submit"}
                  className="mt-0 w-full"
                />
              </div>
            </form>
          </FormProvider>{" "}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default TableFiltersSheet;
