/**
 * タクトタイム計算機
 * 製造現場で使用するタクトタイム（Takt Time）を計算するアプリケーション
 */

'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // 入力値の状態管理（数値）
  const [workingHours, setWorkingHours] = useState(8);
  const [breakTime, setBreakTime] = useState(60);
  const [targetQuantity, setTargetQuantity] = useState(400);

  // 入力中の表示用文字列
  const [workingHoursInput, setWorkingHoursInput] = useState('8');
  const [breakTimeInput, setBreakTimeInput] = useState('60');
  const [targetQuantityInput, setTargetQuantityInput] = useState('400');

  // 計算結果の状態管理
  const [taktTime, setTaktTime] = useState(0);
  const [hourlyTarget, setHourlyTarget] = useState(0);

  // 初回マウント時にlocalStorageから値を読み込む
  useEffect(() => {
    const savedWorkingHours = localStorage.getItem('takt-working-hours');
    const savedBreakTime = localStorage.getItem('takt-break-time');
    const savedTargetQuantity = localStorage.getItem('takt-target-quantity');

    if (savedWorkingHours !== null) {
      const value = parseFloat(savedWorkingHours);
      setWorkingHours(value);
      setWorkingHoursInput(savedWorkingHours);
    }
    if (savedBreakTime !== null) {
      const value = parseFloat(savedBreakTime);
      setBreakTime(value);
      setBreakTimeInput(savedBreakTime);
    }
    if (savedTargetQuantity !== null) {
      const value = parseFloat(savedTargetQuantity);
      setTargetQuantity(value);
      setTargetQuantityInput(savedTargetQuantity);
    }
  }, []);

  // 入力値が変更されるたびに計算を実行
  useEffect(() => {
    // 稼働可能時間を計算（分）
    const availableTime = workingHours * 60 - breakTime;

    // ゼロ除算を防ぐ
    if (targetQuantity <= 0 || availableTime <= 0) {
      setTaktTime(0);
      setHourlyTarget(0);
      return;
    }

    // タクトタイム（秒）を計算
    const calculatedTaktTime = (availableTime * 60) / targetQuantity;
    setTaktTime(calculatedTaktTime);

    // 1時間あたりの必要数を計算
    const calculatedHourlyTarget = 3600 / calculatedTaktTime;
    setHourlyTarget(calculatedHourlyTarget);

    // localStorageに保存
    localStorage.setItem('takt-working-hours', workingHours.toString());
    localStorage.setItem('takt-break-time', breakTime.toString());
    localStorage.setItem('takt-target-quantity', targetQuantity.toString());
  }, [workingHours, breakTime, targetQuantity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm dark:bg-slate-800">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white md:text-3xl">
            Takt Time Calc
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            製造現場向けタクトタイム計算機
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* 入力カード */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
          <h2 className="mb-6 text-xl font-semibold text-slate-800 dark:text-white">
            入力条件
          </h2>

          <div className="space-y-6">
            {/* 稼働時間 */}
            <div>
              <label
                htmlFor="working-hours"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                稼働時間 (時間)
              </label>
              <div className="relative">
                <input
                  id="working-hours"
                  type="number"
                  min="0"
                  step="0.5"
                  value={workingHoursInput}
                  onChange={(e) => setWorkingHoursInput(e.target.value)}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (isNaN(value) || value < 0) {
                      setWorkingHours(0);
                      setWorkingHoursInput('0');
                    } else {
                      setWorkingHours(value);
                      setWorkingHoursInput(value.toString());
                    }
                  }}
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 pr-12 text-lg text-slate-800 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    setWorkingHours(0);
                    setWorkingHoursInput('');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-slate-300"
                  aria-label="クリア"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 休憩時間 */}
            <div>
              <label
                htmlFor="break-time"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                休憩時間 (分)
              </label>
              <div className="relative">
                <input
                  id="break-time"
                  type="number"
                  min="0"
                  step="1"
                  value={breakTimeInput}
                  onChange={(e) => setBreakTimeInput(e.target.value)}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (isNaN(value) || value < 0) {
                      setBreakTime(0);
                      setBreakTimeInput('0');
                    } else {
                      setBreakTime(value);
                      setBreakTimeInput(value.toString());
                    }
                  }}
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 pr-12 text-lg text-slate-800 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    setBreakTime(0);
                    setBreakTimeInput('');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-slate-300"
                  aria-label="クリア"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 目標生産数 */}
            <div>
              <label
                htmlFor="target-quantity"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                目標生産数 (個)
              </label>
              <div className="relative">
                <input
                  id="target-quantity"
                  type="number"
                  min="0"
                  step="1"
                  value={targetQuantityInput}
                  onChange={(e) => setTargetQuantityInput(e.target.value)}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (isNaN(value) || value < 0) {
                      setTargetQuantity(0);
                      setTargetQuantityInput('0');
                    } else {
                      setTargetQuantity(value);
                      setTargetQuantityInput(value.toString());
                    }
                  }}
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 pr-12 text-lg text-slate-800 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    setTargetQuantity(0);
                    setTargetQuantityInput('');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-slate-300"
                  aria-label="クリア"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 結果カード */}
        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg dark:from-blue-600 dark:to-blue-700">
          <h2 className="mb-6 text-xl font-semibold text-white">計算結果</h2>

          {/* タクトタイム */}
          <div className="mb-6">
            <div className="mb-2 text-sm font-medium text-blue-100">
              タクトタイム (秒)
            </div>
            <div className="text-6xl font-bold text-white md:text-7xl">
              {taktTime.toFixed(1)}
            </div>
            <div className="mt-1 text-sm text-blue-100">
              秒/個
            </div>
          </div>

          {/* 1時間あたりの必要数 */}
          <div className="rounded-lg border-2 border-blue-400/30 bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-1 text-sm font-medium text-blue-100">
              1時間あたりの必要数
            </div>
            <div className="text-3xl font-bold text-white md:text-4xl">
              {Math.round(hourlyTarget)}
            </div>
            <div className="mt-1 text-sm text-blue-100">
              個/h
            </div>
          </div>
        </div>

        {/* 計算式の説明 */}
        <div className="mt-6 rounded-lg bg-slate-100 p-4 dark:bg-slate-800/50">
          <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            計算式
          </h3>
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <p>稼働可能時間 = (稼働時間 × 60) - 休憩時間</p>
            <p>タクトタイム = (稼働可能時間 × 60) ÷ 目標生産数</p>
            <p>1時間あたりの必要数 = 3600 ÷ タクトタイム</p>
          </div>
        </div>
      </main>
    </div>
  );
}
