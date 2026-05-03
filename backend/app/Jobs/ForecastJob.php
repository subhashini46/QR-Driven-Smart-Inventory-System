<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\Forecast;
use App\Http\Controllers\ForecastController;

class ForecastJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $itemId;
    protected $deptId;

    /**
     * Create a new job instance.
     *
     * @param int $itemId
     * @param int $deptId
     */
    public function __construct($itemId, $deptId)
    {
        $this->itemId = $itemId;
        $this->deptId = $deptId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Quick sanity check - bail if no item
        $item = Item::find($this->itemId);
        if (!$item) {
            \Log::warning("ForecastJob: Item not found for ID {$this->itemId}");
            return;
        }

        // Mimic the paper's descriptive forecasting algo (freq avg per dept history)
        // But delegate to controller for consistency (no logic dupes)
        $controller = new ForecastController();
        $fakeRequest = new \Illuminate\Http\Request();
        $fakeRequest->merge([
            'id' => $this->itemId,
            'dept_id' => $this->deptId
        ]);

        try {
            $controller->run($fakeRequest);
            \Log::info("ForecastJob: Ran for Item {$this->itemId} / Dept {$this->deptId} - Reorder queued successfully");
        } catch (\Exception $e) {
            \Log::error("ForecastJob failed: " . $e->getMessage());
            $this->fail($e);  // Retry or fail gracefully
        }

        // Paper's SMS tie-in? Log a stub for now (real Twilio in prod [[3][4]])
        // \Log::info("SMS Notification: Reorder point updated for {$item->name} in Dept {$this->deptId}");
    }
}