import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function DemoTabs() {
  return (
    <Tabs defaultValue="one" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="one">Tab One</TabsTrigger>
        <TabsTrigger value="two">Tab Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content for tab one</TabsContent>
      <TabsContent value="two">Content for tab two</TabsContent>
    </Tabs>
  )
}
