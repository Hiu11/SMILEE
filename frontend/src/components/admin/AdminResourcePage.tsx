"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Edit3, Plus, RefreshCw, Search, Trash2, X } from "lucide-react";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

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
  const fallbackRef = useRef(fallback);

  const load = async () => {
    setLoading(true);
    setItems(await apiGet<T[]>(endpoint, fallback));
    setLoading(false);
  };

  useEffect(() => {
    let active = true;

    apiGet<T[]>(endpoint, fallbackRef.current).then((data) => {
      if (!active) return;
      setItems(data);
      setLoading(false);
    });

    return () => {
      active = false;
    };
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
    <div className="space-y-6 pb-6">
      <Reveal direction="scale" className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-900/10 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pic/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h1>
          <p className="mt-2 text-sm font-medium text-slate-300 max-w-xl">{description}</p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Button onClick={load} disabled={loading} variant="outline" className="h-12 rounded-xl bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm transition-all shadow-sm font-bold px-5">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
        </div>
      </Reveal>

      {guide?.length ? (
        <Reveal direction="up" delay={0.1}>
          <section className="space-y-3">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-500">Hướng dẫn nhanh</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">Các bước thao tác chính trong tab này.</p>
            </div>
            <Stagger className="grid gap-3 md:grid-cols-3">
              {guide.map((item, index) => (
                <StaggerItem key={item}>
                  <article className="flex gap-3 rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-md p-4 shadow-sm transition hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/80">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 text-sm font-black text-white shadow-sm shadow-indigo-500/20">
                      {index + 1}
                    </div>
                    <p className="text-sm font-bold leading-6 text-slate-700 dark:text-slate-300">{item}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        </Reveal>
      ) : null}

      <Reveal direction="up" delay={0.2}>
        <div className="grid items-start gap-5 xl:grid-cols-[340px_1fr]">
          <Card className="sticky top-24 rounded-3xl border-slate-200/60 shadow-md backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
            <CardContent className="p-5">
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800/50">
                <h2 className="flex items-center gap-2 text-base font-black text-slate-900 dark:text-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                    {editing ? <Edit3 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                  {formTitle}
                </h2>
                {editing ? (
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setEditing(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>
              <form key={editing?.id ?? "create"} onSubmit={submit} className="space-y-4">
                {fields.map((field) => {
                  const defaultValue = getValue(editingRecord, field.name);
                  const required = editing && field.name === "password" ? false : field.required;

                  return (
                    <label key={field.name} className="block">
                      <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-widest text-slate-500">{field.label}</span>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          required={required}
                          defaultValue={defaultValue}
                          className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none transition focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950/50"
                        />
                      ) : field.type === "select" ? (
                        <select
                          name={field.name}
                          required={required}
                          defaultValue={defaultValue}
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-medium outline-none transition focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950/50"
                        >
                          <option value="">Chọn...</option>
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input name={field.name} type={field.type ?? "text"} required={required} defaultValue={defaultValue} className="h-11 rounded-xl bg-slate-50/50 text-sm font-medium transition focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950/50" />
                      )}
                    </label>
                  );
                })}
                {error ? <p className="text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">{error}</p> : null}
                {notice ? <p className="flex items-center gap-2 text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl"><CheckCircle2 className="h-4 w-4" />{notice}</p> : null}
                <Button disabled={saving} className="h-12 w-full rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 text-base font-bold text-white shadow-md shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30">
                  {saving ? "Đang lưu..." : editing ? "Cập nhật dữ liệu" : "Lưu dữ liệu"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200/60 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800/50 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm..." className="h-11 rounded-xl bg-slate-50/50 pl-11 text-sm font-medium transition focus:scale-[1.01] focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950/50" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2.5 text-sm font-bold text-slate-600 dark:border-indigo-900/30 dark:bg-indigo-900/20 dark:text-slate-300">
                  {totalLabel}: <span className="text-indigo-600 dark:text-indigo-400 text-lg font-black">{filtered.length}</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-x-auto"
              >
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 dark:bg-slate-900/40">
                    <tr>
                      {columns.map((column) => (
                        <th key={column.key} className="whitespace-nowrap px-5 py-4 text-xs font-extrabold uppercase tracking-widest text-slate-400">
                          {column.label}
                        </th>
                      ))}
                      {canEdit || canDelete ? <th className="whitespace-nowrap px-5 py-4 text-right text-xs font-extrabold uppercase tracking-widest text-slate-400">Thao tác</th> : null}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {filtered.map((item, index) => (
                      <motion.tr
                        key={item.id ?? index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut", delay: Math.min(index * 0.035, 0.28) }}
                        className="group bg-white transition-colors hover:bg-indigo-50/30 dark:bg-slate-950/50 dark:hover:bg-slate-900/50"
                      >
                        {columns.map((column) => (
                          <td key={column.key} className="whitespace-nowrap px-5 py-4 text-sm font-bold text-slate-700 dark:text-slate-200">
                            {column.render ? column.render(item) : String((item as Record<string, unknown>)[column.key] ?? "--")}
                          </td>
                        ))}
                        {canEdit || canDelete ? (
                          <td className="whitespace-nowrap px-5 py-4 text-right">
                            <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                              {canEdit ? (
                                <Button variant="outline" size="sm" className="h-9 rounded-xl px-3 text-xs font-bold shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" onClick={() => setEditing(item)}>
                                  <Edit3 className="mr-1.5 h-3.5 w-3.5" />
                                  Sửa
                                </Button>
                              ) : null}
                              {canDelete ? (
                                <Button variant="outline" size="sm" className="h-9 rounded-xl px-3 text-xs font-bold text-red-600 shadow-sm hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/30" onClick={() => remove(item)}>
                                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
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

              {!loading && filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{emptyLabel}</p>
                </div>
              ) : null}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <RefreshCw className="mb-4 h-8 w-8 animate-spin text-indigo-500" />
                  <p className="text-sm font-bold text-slate-500">Đang tải dữ liệu...</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </Reveal>
    </div>
  );
}
