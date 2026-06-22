"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Edit3, Plus, RefreshCw, Search, Trash2, X } from "lucide-react";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export type ResourceField = {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "datetime-local" | "textarea" | "select";
  options?: { label: string; value: string }[];
  required?: boolean;
};

export type ResourceColumn<T> = {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type AdminResourcePageProps<T extends { id?: string }> = {
  title: string;
  description: string;
  endpoint: string;
  totalLabel: string;
  emptyLabel: string;
  fields: ResourceField[];
  columns: ResourceColumn<T>[];
  fallback: T[];
  guide?: string[];
  canEdit?: boolean;
  canDelete?: boolean;
};

const getValue = (item: Record<string, unknown>, name: string) => {
  const value = item[name];
  if (value === null || value === undefined) return "";
  return String(value);
};

export function AdminResourcePage<T extends { id?: string }>({
  title,
  description,
  endpoint,
  totalLabel,
  emptyLabel,
  fields,
  columns,
  fallback,
  guide,
  canEdit = true,
  canDelete = true,
}: AdminResourcePageProps<T>) {
  const [items, setItems] = useState<T[]>(fallback);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState<T | null>(null);

  const load = async () => {
    setLoading(true);
    setItems(await apiGet<T[]>(endpoint, fallback));
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(keyword));
  }, [items, query]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(
      fields
        .map((field) => {
          const raw = form.get(field.name);
          const value = field.type === "number" ? Number(raw) : raw;
          return [field.name, value];
        })
        .filter(([key, value]) => !(editing && key === "password" && !value)),
    );

    try {
      if (editing?.id) {
        const updated = await apiPatch<T>(`${endpoint}/${editing.id}`, payload);
        setItems((current) => current.map((item) => (item.id === editing.id ? { ...item, ...updated } : item)));
        setNotice("Đã cập nhật dữ liệu.");
      } else {
        const created = await apiPost<T>(endpoint, payload);
        setItems((current) => [created, ...current]);
        setNotice("Đã thêm dữ liệu mới.");
      }

      event.currentTarget.reset();
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể lưu dữ liệu.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: T) => {
    if (!item.id) return;
    const accepted = window.confirm("Bạn chắc chắn muốn xóa dòng dữ liệu này?");
    if (!accepted) return;

    setError("");
    setNotice("");

    try {
      await apiDelete(`${endpoint}/${item.id}`);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      if (editing?.id === item.id) setEditing(null);
      setNotice("Đã xóa dữ liệu.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể xóa dữ liệu.");
    }
  };

  const formTitle = editing ? "Cập nhật dữ liệu" : "Thêm dữ liệu";
  const editingRecord = (editing ?? {}) as Record<string, unknown>;

  return (
    <div className="space-y-5 pb-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{title}</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">{description}</p>
        </div>
        <Button onClick={load} variant="outline" className="h-10 rounded-xl">
          <RefreshCw className="mr-2 h-4 w-4" />
          Làm mới
        </Button>
      </div>

      {guide?.length ? (
        <section className="space-y-3">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-500">Hướng dẫn nhanh</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">Các bước thao tác chính trong tab này.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {guide.map((item, index) => (
              <article key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{item}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid items-start gap-4 xl:grid-cols-[300px_1fr]">
        <Card className="border-slate-200 shadow-sm dark:border-slate-800">
          <CardContent className="p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                {editing ? <Edit3 className="h-4 w-4 text-blue-600" /> : <Plus className="h-4 w-4 text-blue-600" />}
                {formTitle}
              </h2>
              {editing ? (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditing(null)}>
                  <X className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
            <form key={editing?.id ?? "create"} onSubmit={submit} className="space-y-2.5">
              {fields.map((field) => {
                const defaultValue = getValue(editingRecord, field.name);
                const required = editing && field.name === "password" ? false : field.required;

                return (
                  <label key={field.name} className="block">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-500">{field.label}</span>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        required={required}
                        defaultValue={defaultValue}
                        className="min-h-16 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900"
                      />
                    ) : field.type === "select" ? (
                      <select
                        name={field.name}
                        required={required}
                        defaultValue={defaultValue}
                        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900"
                      >
                        <option value="">Chọn</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input name={field.name} type={field.type ?? "text"} required={required} defaultValue={defaultValue} className="h-9 rounded-lg bg-slate-50 dark:bg-slate-900" />
                    )}
                  </label>
                );
              })}
              {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
              {notice ? <p className="flex items-center gap-2 text-sm font-semibold text-green-600"><CheckCircle2 className="h-4 w-4" />{notice}</p> : null}
              <Button disabled={saving} className="h-9 w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                {saving ? "Đang lưu..." : editing ? "Cập nhật" : "Lưu"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm dark:border-slate-800">
          <CardContent className="p-0">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm..." className="h-9 rounded-lg bg-slate-50 pl-10 dark:bg-slate-900" />
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                {totalLabel}: <span className="text-blue-600">{filtered.length}</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/60">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} className="whitespace-nowrap px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                        {column.label}
                      </th>
                    ))}
                    {(canEdit || canDelete) ? <th className="whitespace-nowrap px-3 py-2.5 text-right text-[11px] font-bold uppercase tracking-wide text-slate-500">Thao tác</th> : null}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.map((item, index) => (
                    <motion.tr
                      key={item.id ?? index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut", delay: Math.min(index * 0.035, 0.28) }}
                      className="bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900/60"
                    >
                      {columns.map((column) => (
                        <td key={column.key} className="whitespace-nowrap px-3 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200">
                          {column.render ? column.render(item) : String((item as Record<string, unknown>)[column.key] ?? "--")}
                        </td>
                      ))}
                      {(canEdit || canDelete) ? (
                        <td className="whitespace-nowrap px-3 py-2.5 text-right">
                          <div className="flex justify-end gap-2">
                            {canEdit ? (
                              <Button variant="outline" size="sm" className="h-8 rounded-lg px-2 text-xs" onClick={() => setEditing(item)}>
                                <Edit3 className="mr-1 h-3.5 w-3.5" />
                                Sửa
                              </Button>
                            ) : null}
                            {canDelete ? (
                              <Button variant="outline" size="sm" className="h-8 rounded-lg px-2 text-xs text-red-600 hover:text-red-700" onClick={() => remove(item)}>
                                <Trash2 className="mr-1 h-3.5 w-3.5" />
                                Xóa
                              </Button>
                            ) : null}
                          </div>
                        </td>
                      ) : null}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {!loading && filtered.length === 0 ? <p className="p-8 text-center text-sm font-semibold text-slate-500">{emptyLabel}</p> : null}
            {loading ? <p className="p-8 text-center text-sm font-semibold text-slate-500">Đang tải dữ liệu...</p> : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
