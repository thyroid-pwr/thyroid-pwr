import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Image, Library, Tags } from "lucide-react";

export function TeamSection() {
  return (
    <section className="space-y-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        ThyroID team
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Library />
              Piotr Durniat
            </CardTitle>
            <CardDescription>
              AI Engineer
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-foreground mt-2">Lorem Ipsum</p>

          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image />
              Tomasz Hałas
            </CardTitle>
            <CardDescription>
              AI Engineer
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-foreground mt-2">Lorem Ipsum</p>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags />
              Jakub Kukowski
            </CardTitle>
            <CardDescription>
              AI Engineer
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-foreground mt-2">Lorem Ipsum</p>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags />
              Wiktor Sadowy
            </CardTitle>
            <CardDescription>
              AI Engineer
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-foreground mt-2">Lorem Ipsum</p>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags />
              prof. Halina Kwaśnicka
            </CardTitle>
            <CardDescription>
              Supervisor
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-foreground mt-2">Lorem Ipsum</p>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags />
              dr. Tomasz Tomkalski
            </CardTitle>
            <CardDescription>
              Medical Consultant
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-foreground mt-2">Lorem Ipsum</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}