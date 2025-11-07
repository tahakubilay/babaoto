'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DocumentsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Belgeler</h1>
      <Tabs defaultValue="contracts">
        <TabsList>
          <TabsTrigger value="contracts">Sözleşme Şablonları</TabsTrigger>
          <TabsTrigger value="deeds">Senet Şablonları</TabsTrigger>
        </TabsList>
        <TabsContent value="contracts">
          <div className="flex justify-end mb-4">
            <Button>Yeni Şablon Ekle</Button>
          </div>
          {/* Add your contract templates here */}
        </TabsContent>
        <TabsContent value="deeds">
          <div className="flex justify-end mb-4">
            <Button>Yeni Şablon Ekle</Button>
          </div>
          {/* Add your deed templates here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsPage;
